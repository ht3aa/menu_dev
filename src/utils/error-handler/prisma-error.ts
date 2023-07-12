import { Request, Response } from "express";
import { Prisma } from "@prisma/client";

const handler = async (
  req: Request,
  res: Response,
  error: Prisma.PrismaClientKnownRequestError | any
) => {
  function response(status: number, detail: string) {
    return res.status(status).json({ detail });
  }

  if (error.code === "P2002") {
    return response(400, `${error.meta.target[0]} field must be unique`);
  }

  if (error.code === "P2003") {
    return response(
      400,
      `A constraint failed on the database: ${
        error.meta.field_name.split("_")[1]
      }`
    );
  }

  if (error.code == "P2005") {
    return response(
      400,
      `The value ${error.meta.field_value} stored in the database for the field ${error.meta.field_name} is invalid for the field's type`
    );
  }

  if (error.code === "P2006") {
    return response(
      400,
      `The provided value ${error.meta.field_value} for ${error.meta.model_name} field ${error.meta.field_name} is not valid`
    );
  }

  if (error.code === "P2007") {
    return response(400, `data validation error ${error.meta.database_error}`);
  }

  if (error.code === "P2012") {
    return response(400, `missing a required field ${error.meta.path}`);
  }

  if (error.code === "P2011") {
    return response(
      400,
      `Null constraint violation on the ${error.meta.constraint}`
    );
  }

  if (error.code === "P2019") {
    return response(400, `input error ${error.meta.details}`);
  }

  if (error.code === "P2025") {
    return response(404, error.message);
  }
};

export default handler;
