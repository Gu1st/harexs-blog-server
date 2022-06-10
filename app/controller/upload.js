'use strict';
const Controller = require('egg').Controller;
const fs = require('mz/fs');
const path = require('path');

class UploadController extends Controller {
  async upload() {
    const { ctx } = this;
    const file = ctx.request.files[0];

    try {
      const fileData = fs.readFileSync(file.filepath);
      const tempDir = path.join('app/public/uploads/', +new Date() + path.extname(file.filename));
      console.log(__dirname);
      fs.writeFileSync(tempDir, fileData);
      ctx.body = {
        code: 200,
        msg: '上传成功',
        data: tempDir
      };
    } catch (error) {
      ctx.body = {
        code: 500,
        msg: error.message || '上传失败'
      };
    } finally {
      await fs.unlink(file.filepath);
    }
  }
}

module.exports = UploadController;
