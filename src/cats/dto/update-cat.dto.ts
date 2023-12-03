import { PartialType } from "@nestjs/mapped-types";
import { CreateCat } from "./create-cat.dto";

export class UpdateCat extends PartialType(CreateCat){}