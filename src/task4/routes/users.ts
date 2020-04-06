
import {
  UserType,
  UserSchema
} from "../typings";
import {
  ValidatedRequest
} from "express-joi-validation";
import {
  Response,
  Request,
  NextFunction
} from "express";
import UserService from "../services/UserService";
import ValidationService from "../services/ValidationService";

const userService = new UserService();
const validationService = new ValidationService();

export async function init({ app }) {
  app.get("/users", async (req: Request, res: Response, next: NextFunction) => {
    try {
      const users: UserType[] = await userService.GetUsers();

      if(!users) {
        res.sendStatus(404);
      } else {
        res.status(200);
        res.json(users);
        next();
      }
    } catch(err) {
      res.status(400);
      next(err);
    }
  })
  
  app.get("/user/:id", async (req: Request, res: Response, next: NextFunction) => {
    try {
      const user: UserType = await userService.GetUser(req.params.id);
      
      if(!user) {
        res.sendStatus(404);
      } else {
        res.status(200);
        res.json(user);
        next();
      }
    } catch(err) {
      res.status(400);
      next(err);
    }
  });
  
  app.post("/user", validationService.ValidateSchema(), async (req: ValidatedRequest<UserSchema>, res: Response, next: NextFunction) => {
    try {
      const newUser: UserType = await userService.AddUser(req.body);
  
      res.json(newUser);
      res.status(200);
      next();
    } catch(err) {
      res.status(400);
      next(err);
    }
  });
  
  app.put("/user/:id", validationService.ValidateSchema(), async (req: ValidatedRequest<UserSchema>, res: Response, next: NextFunction) => {
    try {
      const user: UserType = await userService.UpdateUser({ body: req.body, id: req.params.id });

      if(!user) {
        res.sendStatus(404);
      } else {
        res.status(200);
        res.json(user);
        next();
      }
    } catch(err) {
      res.status(400);
      next(err);
    }
  });
  
  app.get("/auto-suggest/:loginSubstring", async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { loginSubstring, limit } = req.params;
      const suggestedUsers: UserType[] = await userService.GetAutoSuggestList({ loginSubstring, limit });

      if(!suggestedUsers) {
        res.sendStatus(404);
      } else {
        res.status(200);
        res.json(suggestedUsers);
        next();
      }
    } catch(err) {
      res.status(400);
      next(err);
    }
  });
  
  app.delete("/user/:id", async (req: Request, res: Response, next: NextFunction) => {
    try {  
      const user: UserType = await userService.DeleteUser(req.params.id);

      if(!user) {
        res.sendStatus(404);
      } else {
        res.status(200);
        res.json(user);
        next();
      }
    } catch(err) {
      res.status(400);
      next(err);
    }
  });
}
