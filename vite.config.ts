export default defineConfig(({ mode }) => {
  return {
    base: '/portfolio/', // This must match your GitHub repository name
    plugins: [react()],
    server: {
      port: 3000,
      host: '0.0.0.0',
    },
  };
});
