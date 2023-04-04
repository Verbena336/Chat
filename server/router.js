import { Router } from 'express';
const router = Router();

router.get('/', (req, res) => res.send('Hello'));
router.get('/*', (req, res) => res.send('404'));

export default router;
