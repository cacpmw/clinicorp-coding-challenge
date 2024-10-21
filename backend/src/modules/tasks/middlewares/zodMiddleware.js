const { z } = require("zod");
const insertSchema = z.object({
  body: z.object({
    description: z
      .string({ required_error: "Campo Obrigatorio" })
      .min(5, "Minimo 5 caracteres"),
    responsible: z
      .string({ required_error: "Campo Obrigatorio" })
      .min(3, "Minimo 3 caracteres"),
    status: z
      .string({ required_error: "Campo Obrigatorio" })
      .refine((input) => {
        return input.length > 0;
      }, "Este campo nao pode ser vazio"),
    computer: z
      .string({ required_error: "Campo Obrigatorio" })
      .refine((input) => {
        return input.length > 0;
      }, "Este campo nao pode ser vazio"),
  }),
});
const zodSchemaValidation = (schema) => (req, res, next) => {
  try {
    schema.parse({
      body: req.body,
      query: req.query,
      params: req.params,
    });

    next();
  } catch (err) {
    return res.status(400).send(err.errors);
  }
};

const zodNewTaskValidatorMiddleware = () => {
  return zodSchemaValidation(insertSchema);
};

module.exports = {
  insertSchema,
  zodSchemaValidation,
  zodNewTaskValidatorMiddleware,
};
