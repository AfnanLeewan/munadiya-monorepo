const fs = require('fs')

function printReportHeader(results) {
  const { numFailedTests: failedTests } = results

  if (failedTests === 0) {
    return ':tada: Your test report is in, all tests passed!'
  }

  return `:boom: Your test report is in, we've got ${failedTests} failing test(s)!`
}

/**
 * Print results of each test
 * @param result
 */
function printTestResults(result) {
  const formattedStatus =
    result.status === 'failed' ? `💥 *FAILED*` : result.status

  const blocks = [
    // Print formatted name, status and timing information
    `- \`${result.title}\`: ${formattedStatus} ${
      result.duration ? `in ${result.duration}ms` : ''
    }`,
  ]

  // Print failure messages for failed tests
  if (result.status === 'failed') {
    // eslint-disable-next-line no-restricted-syntax
    for (const message of result.failureMessages) {
      blocks.push(
        `
\`\`\`
${message?.replace(
  // remove all the color codes from the message
  // eslint-disable-next-line no-control-regex
  /[\u001b\u009b][[()#;?]*(?:[0-9]{1,4}(?:;[0-9]{0,4})*)?[0-9A-ORZcf-nqry=><]/g,
  '',
)}
\`\`\`
          `,
      )
    }
  }

  return blocks
}

/**
 * Print results of every suite
 * @param results
 */
function printSuiteResults(results) {
  const blocks = []

  // eslint-disable-next-line no-restricted-syntax
  for (const suite of results.testResults) {
    blocks.push(
      '------',
      `Test Suite \`${suite.testResults[0].ancestorTitles[0]}\`: \n\n🚨 ${suite.numFailingTests} failing, ✅ ${suite.numPassingTests} passing`,
    )

    // Print complete failure message for failed test suites
    if (suite.numFailingTests) {
      blocks.push(
        `
🚧 Suite failed with message:
\`\`\`
${suite.failureMessage?.replace(
  // remove all the color codes from the message
  // eslint-disable-next-line no-control-regex
  /[\u001b\u009b][[()#;?]*(?:[0-9]{1,4}(?:;[0-9]{0,4})*)?[0-9A-ORZcf-nqry=><]/g,
  '',
)} \`\`\``,
      )
    }

    blocks.push(...suite.testResults.flatMap(printTestResults))
  }

  return blocks
}

/**
 * A custom Jest reporter implementing only the onRunComplete
 * method of the Reporter interface, since we don't want to handle
 * other events.
 */
class CustomReporter {
  /**
   * Event hook for onRunComplete, is triggered on completion
   * @param _
   * @param results
   */
  async onRunComplete(_, results) {
    const markdown = {
      blocks: [
        printReportHeader(results),
        ...printSuiteResults(results),
        '------',
        `Report generated at ${new Date().toLocaleString('en-US')}`,
      ],
    }

    // write to markdown file
    fs.writeFileSync(
      `integration-test-report-${Date.now()}.md`,
      markdown.blocks.join('\n'),
      'utf-8',
    )
  }
}

module.exports = CustomReporter
