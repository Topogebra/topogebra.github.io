import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";

export async function registerRoutes(app: Express): Promise<Server> {
  // API routes prefix
  const apiRoute = "/api";

  // Get high scores
  app.get(`${apiRoute}/scores`, async (req, res) => {
    try {
      // This would normally fetch scores from a database
      // For now, we'll return mock data since we're using memory storage
      res.json({
        scores: [
          { username: "MathWhiz", score: 180 },
          { username: "NumberNinja", score: 150 },
          { username: "AlgebraAce", score: 120 }
        ]
      });
    } catch (error) {
      console.error("Error getting scores:", error);
      res.status(500).json({ message: "Failed to get scores" });
    }
  });

  // Save a new score
  app.post(`${apiRoute}/scores`, async (req, res) => {
    try {
      const { username, score } = req.body;
      
      if (!username || typeof score !== 'number') {
        return res.status(400).json({ message: "Invalid score data" });
      }
      
      // This would normally save to a database
      // For now, just acknowledge receipt
      res.status(201).json({ message: "Score saved successfully" });
    } catch (error) {
      console.error("Error saving score:", error);
      res.status(500).json({ message: "Failed to save score" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
