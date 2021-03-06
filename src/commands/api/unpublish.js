const { putApi } = require('../../requests/api')
const { getApiIdentifierArg } = require('../../support/command/parse-input')
const BaseCommand = require('../../support/command/base-command')

class UnpublishCommand extends BaseCommand {
  
  async run() {
    const { args } = this.parse(UnpublishCommand)
    const apiPath = getApiIdentifierArg(args)

    const unpublish = {
      pathParams: [apiPath, 'settings', 'lifecycle'],
      body: JSON.stringify({ published: false })
    }
    
    await this.executeHttp({
      execute: () => putApi(unpublish), 
      onResolve: this.logCommandSuccess({ apiPath }),
      options: { resolveStatus: [403] }
    })
  }
}

UnpublishCommand.description = 'unpublish an API version'

UnpublishCommand.examples = [
  'swaggerhub api:unpublish organization/api/1.0.0'
]

UnpublishCommand.args = [{ 
  name: 'OWNER/API_NAME/VERSION',
  required: true,
  description: 'API identifier'
}]

UnpublishCommand.flags = BaseCommand.flags

module.exports = UnpublishCommand
