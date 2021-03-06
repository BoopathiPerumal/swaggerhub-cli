const { putApi } = require('../../requests/api')
const { getApiIdentifierArg, splitPathParams } = require('../../support/command/parse-input')
const BaseCommand = require('../../support/command/base-command')

class SetDefaultCommand extends BaseCommand {

  async run() {
    const { args } = this.parse(SetDefaultCommand)
    const apiPath = getApiIdentifierArg(args)
    const [owner, name, version] = splitPathParams(apiPath)

    const setDefault = {
      pathParams: [owner, name, 'settings', 'default'],
      body: JSON.stringify({ version })
    }
    
    await this.executeHttp({
      execute: () => putApi(setDefault), 
      onResolve: this.logCommandSuccess({ owner, name, version }),
      options: { resolveStatus: [403] }
    })
  }
}

SetDefaultCommand.description = 'set the default version of an API'

SetDefaultCommand.examples = [
  'swaggerhub api:setdefault organization/api/2.0.0'
]

SetDefaultCommand.args = [{ 
  name: 'OWNER/API_NAME/VERSION',
  required: true,
  description: 'API identifier'
}]

SetDefaultCommand.flags = BaseCommand.flags

module.exports = SetDefaultCommand
