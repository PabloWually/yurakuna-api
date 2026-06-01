import type { APIGatewayProxyHandlerV2 } from "aws-lambda";
import { handle } from "hono/aws-lambda";
import { app } from "./app";

export const handler: APIGatewayProxyHandlerV2 = handle(app);
