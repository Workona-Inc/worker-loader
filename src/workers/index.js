/* eslint-disable multiline-ternary */
import path from 'path';

const getWorker = (file, content, options) => {
  const publicPath = options.publicPath
    ? JSON.stringify(options.publicPath)
    : '__webpack_public_path__';

  const publicWorkerPath = `${publicPath} + ${JSON.stringify(file)}`;

  if (options.inline) {
    const InlineWorkerPath = JSON.stringify(
      `!!${path.join(__dirname, 'InlineWorker.js')}`
    );

    const fallbackWorkerPath =
      options.fallback === false ? 'null' : publicWorkerPath;

    return `function() {\n return require(${InlineWorkerPath})(${JSON.stringify(
      content
    )}, ${fallbackWorkerPath});\n}`;
  }

  return `function(shared) {\n return shared ? new SharedWorker(${publicWorkerPath}) : new Worker(${publicWorkerPath});\n}`;
};

export default getWorker;
