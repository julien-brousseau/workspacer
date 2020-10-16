/* eslint-disable import/no-webpack-loader-syntax */
import * as JsStore from 'jsstore';

const getWorkerPath = () => {
  return require('file-loader?name=scripts/[name].[hash].js!jsstore/dist/jsstore.worker.min.js');
};

const workerPath = getWorkerPath();
export const connection = new JsStore.Connection(new Worker(workerPath));
connection.setLogStatus(false);
