import { load } from 'ts-dotenv';
 
const env = load({
    NODE_ENV: [
        'production' as const,
        'development' as const,
    ],
});

export default env;