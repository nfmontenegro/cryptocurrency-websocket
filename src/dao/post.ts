import db from "../database/models";

async function create(fields): Promise<void> {
  return db.Post.create(fields);
}

export {create};
