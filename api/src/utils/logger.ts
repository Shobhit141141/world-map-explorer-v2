import chalk from 'chalk';

const successTag = chalk.bgGreen.black.bold(' SUCCESS ');
const errorTag = chalk.bgRed.white.bold(' ERROR ');
const infoTag = chalk.bgCyan.black.bold(' INFO ');
const warningTag = chalk.bgYellow.black.bold(' WARNING ');

export const logSuccess = (message: string) => {
  console.log(`${successTag} ${chalk.greenBright(message)}`);
};

export const logError = (message: string, error?: Error) => {
  console.error(`${errorTag} ${chalk.redBright.bold(message)}`);
  if (error) console.error(chalk.red(error.message));
};

export const logInfo = (message: string) => {
  console.log(`${infoTag} ${message}`);
};

export const logWarning = (message: string) => {
  console.warn(`${warningTag} ${chalk.yellowBright.underline(message)}`);
};

export const logger = (tag: string, message: string, bgColor: string, messageColor: string) => {
  console.log(`${chalk.bgHex(bgColor).hex(messageColor)(tag)} ${chalk.hex(messageColor)(message)}`);
};

//  logger(' INFO ', 'This is a custom logger', '#FF5733', '#FF5733');
