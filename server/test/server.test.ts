import request from "supertest";
import app from "../src/index"; 
import fs from "fs";
import path from "path";

const dataPath = path.join(__dirname, "../data/data.json");

// פונקציית עזר לאיפוס קובץ הנתונים לפני כל טסט
const resetTestData = () => {
  const initialData = {
    tasks: [
      {
        id: "test-id-1",
        title: "Existing Task 1",
        completed: false,
        priority: "medium" ,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
    ],
  };
  fs.writeFileSync(dataPath, JSON.stringify(initialData, null, 2));
};

describe("Task API CRUD Tests", () => {
  beforeAll(() => {
    resetTestData();
  });

  beforeEach(() => {
    resetTestData();
  });

  // CREATE - POST /tasks
  describe("POST /tasks", () => {
    it("should create a new task", async () => {
      const newTask = {
        title: "Test Task",
        priority: "high",
      };

      const response = await request(app)
        .post("/tasks")
        .send(newTask)
        .expect(201);

      expect(response.body).toMatchObject({
        id: expect.any(String),
        title: "Test Task",
        priority: "high",
        completed: false,
      });

      // Verify the task was actually saved
      const getResponse = await request(app).get("/tasks").expect(200);

      expect(
        getResponse.body.some((t: any) => t.id === response.body.id)
      ).toBeTruthy();
    });

    it("should return 400 for invalid task data", async () => {
      await request(app)
        .post("/tasks")
        .send({}) // No title
        .expect(400);
    });
  });

  // READ - GET /tasks
  describe("GET /tasks", () => {
    it("should retrieve all tasks", async () => {
      const response = await request(app).get("/tasks").expect(200);

      expect(Array.isArray(response.body)).toBeTruthy();
      expect(response.body.length).toBeGreaterThan(0);
    });

    it("should filter tasks by completed status", async () => {
      // First mark our test task as completed
      await request(app).put("/tasks/test-id-1").send({ completed: true });

      const response = await request(app)
        .get("/tasks?completed=true")
        .expect(200);

      expect(response.body.every((t: any) => t.completed)).toBeTruthy();
    });
  });

  // UPDATE - PUT /tasks/:id
  describe("PUT /tasks/:id", () => {
    it("should update an existing task", async () => {
      const updates = {
        title: "Updated Task Title",
        completed: true,
        priority: "high",
      };

      const response = await request(app)
        .put("/tasks/test-id-1")
        .send(updates)
        .expect(200);

      expect(response.body).toMatchObject(updates);
    });

    it("should return 404 for non-existent task", async () => {
      await request(app)
        .put("/tasks/non-existent-id")
        .send({ title: "Updated" })
        .expect(404);
    });
  });

  // DELETE - DELETE /tasks/:id
  describe("DELETE /tasks/:id", () => {
    it("should delete an existing task", async () => {
      await request(app).delete("/tasks/test-id-1").expect(200);

      // Verify the task was actually deleted
      const getResponse = await request(app).get("/tasks").expect(200);

      expect(
        getResponse.body.some((t: any) => t.id === "test-id-1")
      ).toBeFalsy();
    });

    it("should return 404 for non-existent task", async () => {
      await request(app).delete("/tasks/non-existent-id").expect(404);
    });
  });

  // STATS - GET /tasks/stats
  describe("GET /tasks/stats", () => {
    it("should return task statistics", async () => {
      const response = await request(app).get("/tasks/stats").expect(200);

      expect(response.body).toEqual({
        totalTasks: expect.any(Number),
        completedTasks: expect.any(Number),
        pendingTasks: expect.any(Number),
        priorityCounts: {
        //   low: expect.any(Number),
          medium: expect.any(Number),
        //   high: expect.any(Number),
        },
      });
    });
  });
});
