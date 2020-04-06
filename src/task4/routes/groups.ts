
import { GroupType } from "../typings";
import {
  Response,
  Request,
  NextFunction
} from "express";
import GroupService from "../services/GroupService";

const groupService = new GroupService();

export async function init({ app }) {
  app.get("/groups", async (req: Request, res: Response, next: NextFunction) => {
    try {
      const groups: GroupType[] = await groupService.GetGroups();

      if(!groups) {
        res.sendStatus(404);
      } else {
        res.status(200);
        res.json(groups);
        next();
      }
    } catch(err) {
      res.status(400);
      next(err);
    }
  });
  
  app.get("/group/:id", async (req: Request, res: Response, next: NextFunction) => {
    try {
      const group: GroupType = await groupService.GetGroup(req.params.id);

      if(!group) {
        res.sendStatus(404);
      } else {
        res.status(200);
        res.json(group);
        next();
      }
    } catch(err) {
      res.status(400);
      next(err);
    }
  });
  
  app.post("/group", async (req: Request, res: Response, next: NextFunction) => {
    try {
      const newGroup: GroupType = await groupService.AddGroup(req.body);

      if(!newGroup) {
        res.sendStatus(404);
      } else {
        res.status(200);
        res.json(newGroup);
        next();
      }
    } catch(err) {
      res.status(400);
      next(err);
    }
  });
  
  app.put("/group/:id", async (req: Request, res: Response, next: NextFunction) => {
    try {
      const group: GroupType = await groupService.UpdateGroup({ body: req.body, id: req.params.id });

      if(!group) {
        res.sendStatus(404);
      } else {
        res.status(200);
        res.json(group);
        next();
      }
    } catch(err) {
      res.status(400);
      next(err);
    }
  });
  
  app.delete("/group/:id", async (req: Request, res: Response, next: NextFunction) => {
    try {  
      const group: boolean = await groupService.DeleteGroup(req.params.id);

      if(!group) {
        res.sendStatus(404);
      } else {
        res.status(200);
        res.json(group);
        next();
      }
    } catch(err) {
      res.status(400);
      next(err);
    }
  });
}

