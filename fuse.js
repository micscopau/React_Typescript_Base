const { CopyPlugin, CSSPlugin, CSSResourcePlugin, FuseBox, WebIndexPlugin, SassPlugin, QuantumPlugin } = require('fuse-box');
const { src, task, context } = require('fuse-box/sparky');

context(
  class{
    getConfig() {
      return FuseBox.init({
        cache: false,
        homeDir: 'src',
        output: `dist/$name.js`,
        sourceMaps: true,
        target: 'browser@es6',
        useTypeScriptCompiler: true,
        plugins: [
          WebIndexPlugin({
            template: 'src/index.html'
          }),
          [
            SassPlugin({
              importer: true,
              sourceMap: 'rtb.css.map'
            }),
            CSSResourcePlugin({
              dist: 'dist/css-resoucers',
              useOriginalFilenames: true
            }),
            CSSPlugin({
              inject: file => '/rtb.css',
              outFile: file => 'dist/rtb.css'
            })
          ],
          this.isProduction && QuantumPlugin({
            bakeApiIntoBundle: 'rtb',
            css: true,
            extendedServerImport: true,
            treeshake: true,
            uglify: true
          })
        ]
      });
    }
    createBundle(fuse){
      const app = fuse.bundle('rtb');
      if(!this.isProduction){
        app.watch();
        app.hmr();
      }
      app.instructions('>index.tsx');
      return app;
    }
  },
);

task('development', ['clean', 'dev'], () => {});
task('production', ['clean', 'prod'], () => {});

task('clean', () => {
  src('./dist').clean('dist/').exec()
});

task('dev', async context => {
  const fuse = context.getConfig();
  fuse.dev({
    port:5280,
  });
  context.createBundle(fuse);
  await fuse.run();
});

task('prod', async context => {
  context.isProduction = true;
  const fuse = context.getConfig();
  context.createBundle(fuse);
  await fuse.run();
});
