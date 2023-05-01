export default function withHandler({
  method,
  isPrivate = true,
  confirmationHandler,
}) {
  return async function (req, res) {
    if (req.method !== method) {
      return res.status(405).end();
    }
    if (isPrivate && !req.session.user) {
      return res.status(401).json({ ok: false, error: "Please login" });
    }
    try {
      await confirmationHandler(req, res);
    } catch (error) {
      console.log(error);
      return res.status(500).json({ error });
    }
  };
}
