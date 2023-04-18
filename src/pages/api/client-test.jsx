import client from "../../../libs/client";

export default async function handler(req, res) {
  await client.user.create({
    data: {
      email: "hello",
      name: "jinu",
    },
  });
  res.json({
    ok: true,
  });
}
