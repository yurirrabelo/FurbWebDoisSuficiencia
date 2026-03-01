import 'reflect-metadata';
import 'dotenv/config';
import express from 'express';
import swaggerUi from 'swagger-ui-express';
import swaggerJSDoc from 'swagger-jsdoc';
import bcrypt from 'bcrypt';
import { AppDataSource } from './config/database';
import { User } from './entities/User';
import { authRoutes } from './routes/authRoutes';
import { comandaRoutes } from './routes/comandaRoutes';

// Configuração Swagger
const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'FurbWeb API',
      version: '1.0.0',
      description: 'API REST para gerenciar usuários e comandas',
    },
    servers: [
      {
        url: 'http://localhost:3000/FurbWeb/v1',
        description: 'Desenvolvimento',
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
    },
  },
  apis: ['./src/routes/*.ts'],
};

const specs = swaggerJSDoc(swaggerOptions);

const app = express();

// Middlewares básicos
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Swagger UI
app.use('/docs', swaggerUi.serve, swaggerUi.setup(specs));

// Inicializar banco de dados
AppDataSource.initialize()
  .then(async () => {
    console.log('✓ Database connected');
    
    // Criar usuário admin/admin padrão
    const userRepo = AppDataSource.getRepository(User);
    const adminExists = await userRepo.findOne({ where: { login: 'admin' } });
    
    if (!adminExists) {
      const hashedPassword = await bcrypt.hash('admin', 10);
      await userRepo.save({
        login: 'admin',
        senha: hashedPassword,
      });
      console.log('✓ Default admin user created (admin/admin)');
    }
  })
  .catch((error) => {
    console.error('✗ Database error:', error);
    process.exit(1);
  });

// Rotas
app.use('/FurbWeb/v1/auth', authRoutes);
app.use('/FurbWeb/v1/comandas', comandaRoutes);

// Error handler simplificado
app.use((error: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error('Erro:', error.message);
  res.status(error.status || 500).json({
    error: error.message || 'Erro interno do servidor'
  });
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`✓ Server running on port ${PORT}`);
  console.log(`✓ Swagger docs: http://localhost:${PORT}/docs`);
});

export { app };