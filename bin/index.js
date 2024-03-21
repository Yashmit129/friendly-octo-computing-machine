#! /usr/bin/env node
const yargs = require('yargs/yargs');
const boxen = require('boxen');
const figlet = require('figlet');
const chalk = require('chalk');
const { hideBin } = require('yargs/helpers');
// import yargs from "yargs";
// import chalk from "chalk";
// import boxen from "boxen";
// import figlet from "figlet";
var usage = chalk.keyword('violet')("\nUsage: quote -q  -c <category> \n"
    + boxen(chalk.green("\n" + "Tells a quote on a specific category" + "\n"), { padding: 1, borderColor: 'green', dimBorder: true }) + "\n");
var h = yargs(hideBin(process.argv));

h
    .usage(usage)
    .option("c", { alias: "category", describe: "Category", type: "string", demandOption: false })
    .help(true)
    .argv;
console.log(
    chalk.yellow(
        figlet.textSync("Quote", { horizontalLayout: 'full' })
    ),
)
if (h.argv.category == null && h.argv.c == null) {
    h.showHelp()
} else {
    let { category, c } = h.argv
    fetch('https://api.api-ninjas.com/v1/quotes?category=' + category || c, {
        method: 'GET',
        headers: { 'X-Api-Key': '6iB0CeRQuvCHtGwyQDoXPw==FGvUHXmOKUa3UUDw' }
    }).then((v) => {
        return v.json()
    }).then((v) => {
        console.log(v[0].quote)
    })
}