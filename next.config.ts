import type {NextConfig} from 'next';
import path from 'path';

const nextConfig: NextConfig = {
  reactCompiler: true,
  sassOptions: {
    includePaths: ['./src/shared/styles'],
    silenceDeprecations: ['legacy-js-api'],
    additionalData: `
    @use "@/shared/styles/helpers/constants" as *;
    @use "@/shared/styles/helpers/functions" as *;
    @use "@/shared/styles/helpers/media" as *;
    @use "@/shared/styles/helpers/mixins" as *;
    `,
  },
};

export default nextConfig;

