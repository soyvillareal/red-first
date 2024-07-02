import { createLogger, format, transports } from 'winston';

export const logger = createLogger({
  level: 'info', // Nivel mínimo para registrar
  format: format.combine(
    format.timestamp({
      format: 'YYYY-MM-DD HH:mm:ss',
    }),
    format.errors({ stack: true }), // Para capturar el stack de errores
    format.splat(),
    format.json()
  ),
  // Puedes configurar diferentes transportes según el entorno
  transports: [
    // En desarrollo, escribe todos los logs en la consola
    new transports.Console({
      format: format.combine(
        format.colorize(),
        format.simple() // Formato simple para la consola
      ),
    }),
    // En producción, podrías querer escribir los logs en un archivo
    // new transports.File({ filename: 'error.log', level: 'error' }),
    // new transports.File({ filename: 'combined.log' }),
  ],
});
