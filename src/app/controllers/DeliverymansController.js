import * as Yup from 'yup';
import Deliveryman from '../models/Deliveryman';

class DeliverymansController {
  async store(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      email: Yup.string().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ erro: 'Validation fails' });
    }

    const deliveryman = req.body;

    const { id, name, email } = await Deliveryman.create(deliveryman);

    return res.json({ id, name, email });
  }

  async update(req, res) {
    const deliveryman = await Deliveryman.findByPk(req.params.id);

    if (!deliveryman) {
      return res.status(400).json({ error: `id ${req.params.id} not found.` });
    }

    const schema = Yup.object().shape({
      name: Yup.string(),
      email: Yup.string(),
    });

    if (!schema.isValid(req.body)) {
      return res.status(400).json({ erro: 'Validation fails' });
    }

    const { id, name, email } = await deliveryman.update(req.body);

    return res.json({
      id,
      name,
      email,
    });
  }

  async delete(req, res) {
    const deliveryman = await Deliveryman.findByPk(req.params.id);

    if (!deliveryman) {
      return res.status(400).json({ error: `id: ${req.params.id} not found` });
    }

    await deliveryman.destroy();

    return res.json({});
  }

  async index(req, res) {
    const deliverymans = await Deliveryman.findAll({
      attributes: ['id', 'name', 'email'],
    });
    return res.json({ deliverymans });
  }
}

export default new DeliverymansController();
