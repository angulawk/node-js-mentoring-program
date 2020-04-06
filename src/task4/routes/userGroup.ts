
import { UserGroupType } from "../typings";
import {
  Response,
  Request,
  NextFunction
} from "express";
import UserGroupService from "../services/UserGroupService";

const userGroupService = new UserGroupService();

export async function init({ app }) {
  app.get("/userGroups", async (req: Request, res: Response, next: NextFunction) => {
    try {
      const usersGroups: UserGroupType[] = await userGroupService.GetUsersGroups();

      if(!usersGroups) {
        res.sendStatus(404);
      } else {
        res.status(200);
        res.json(usersGroups);
        next();
      }
    } catch(err) {
      res.status(400);
      next(err);
    }
  });
  
  app.post("/userGroups/:id", async (req: Request, res: Response, next: NextFunction) => {
    try {
      const usersGroups: UserGroupType[] = await userGroupService.AddUsersToGroup({ groupId: req.params.id, userIds: req.body.userIds });

      if(!usersGroups) {
        res.sendStatus(404);
      } else {
        res.status(200);
        res.json(usersGroups);
        next();
      }
    } catch(err) {
      res.status(400);
      next(err);
    }
  });
}
