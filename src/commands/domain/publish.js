const { putDomain } = require('../../requests/domain')
const { getDomainIdentifierArg, splitPathParams } = require('../../support/command/parse-input')
const BaseCommand = require('../../support/command/base-command')

class PublishCommand extends BaseCommand {
  
  async run() {
    const { args } = this.parse(PublishCommand)
    const domainPath = getDomainIdentifierArg(args)

    const publish = {
      pathParams: [domainPath, 'settings', 'lifecycle'],
      body: JSON.stringify({ published: true })
    }
    
    await this.executeHttp({
      execute: () => putDomain(publish), 
      onResolve: this.logCommandSuccess({ domainPath }),
      options: { resolveStatus: [403] }
    })
  }
}

PublishCommand.description = 'publish a domain version'

PublishCommand.examples = [
  'swaggerhub domain:publish organization/domain/1.0.0'
]

PublishCommand.args = [{ 
  name: 'OWNER/DOMAIN_NAME/VERSION',
  required: true,
  description: 'Domain identifier'
}]

PublishCommand.flags = BaseCommand.flags

module.exports = PublishCommand
