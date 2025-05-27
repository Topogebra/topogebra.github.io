import express, { type Request, type Response, type NextFunction } from "express";
import { registerRoutes } from "./routes";
import { setupVite, serveStatic, log } from "./vite";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use((req: Request, res: Response, next: NextFunction) => {
  const start = Date.now();
  const path = req.path;
  let capturedJsonResponse: Record<string, any> | undefined = undefined;

  const originalResJson = res.json;
  res.json = function (bodyJson: any) {
    capturedJsonResponse = bodyJson;
    return originalResJson.apply(res, [bodyJson]);
  };//si no jala esta cosa poner esta opcion: Argument of type '[any, ...any[]]' is not assignable to parameter of type '[body?: any]'.
  //Target allows only 1 element(s) but source may have more.ts(2345)  

  res.on("finish", () => {
    const duration = Date.now() - start;
    if (path.startsWith("/api")) {
      let logLine = `${req.method} ${path} ${res.statusCode} in ${duration}ms`;
      if (capturedJsonResponse) {
        logLine += ` :: ${JSON.stringify(capturedJsonResponse)}`;
      }

      if (logLine.length > 80) {
        logLine = logLine.slice(0, 79) + "…";
      }

      log(logLine);
    }
  });

  next();
});

(async () => {
  const server = await registerRoutes(app);

  app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
    const status = err.status || err.statusCode || 500;
    const message = err.message || "Internal Server Error";

    res.status(status).json({ message });
    throw err;
  });

  // Configuración de Vite solo en desarrollo
  if (app.get("env") === "development") {
    await setupVite(app, server);
  } else {
    serveStatic(app);
  }

  // Configuración del servidor con manejo de errores
  const port = 5000;
  const host = "127.0.0.1"; // Cambiado de 0.0.0.0 a 127.0.0.1 para evitar ENOTSUP
  
  // Iniciando el servidor
  server.listen(port, host, () => {
    log(`Server running on http://${host}:${port}`);
  }).on("error", (err: NodeJS.ErrnoException) => {
    if (err.code === "EADDRINUSE") {
      log(`Error: El puerto ${port} está en uso. Prueba con otro puerto.`);
    } else {
      log(`Error al iniciar el servidor: ${err.message}`);
    }
    process.exit(1);
  });
})();

