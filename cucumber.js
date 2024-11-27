module.exports = {
  default:
    '--require-module ts-node/register --require ./step_definitions/**/*.ts --format progress --publish-quiet',
    
    tags: "@smoke or @regression",
};
