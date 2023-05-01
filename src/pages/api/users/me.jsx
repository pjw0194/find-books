import { withIronSessionApiRoute } from "iron-session/next";
import client from "@libs/server/client";
import withHandler from "@libs/server/withHandler";
import { withApiSession } from "@libs/server/withSession";

async function confirmationHandler(req, res) {
  console.log(req.session.user);
  const profile = await client.user.findUnique({
    where: { id: req.session.user.id },
  });
  res.json({
    ok: true,
    profile,
  });
}

export default withApiSession(
  withHandler({ method: "GET", confirmationHandler })
);
