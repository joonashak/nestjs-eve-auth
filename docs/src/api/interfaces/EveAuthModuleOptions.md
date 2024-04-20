# Interface: EveAuthModuleOptions

## Properties

### authorizationUrl

• `Optional` **authorizationUrl**: `string`

EVE SSO Authorization URL.

It is not necessary to set this in normal use. This option is provided for
redundancy.

#### Defined in

[lib/src/eve-auth-module-options.interface.ts:24](https://github.com/joonashak/nestjs-eve-auth/blob/2fa8073/lib/src/eve-auth-module-options.interface.ts#L24)

___

### callbackUrl

• **callbackUrl**: `string`

Your app's EVE SSO Callback URL.

This MUST match what you have entered in your app's EVE SSO configuration
or the authentication will fail. The correct value should be your server
address appended with `/sso/callback`. E.g., when developing locally, this
could be `http://localhost:3000/sso/callback`.

#### Defined in

[lib/src/eve-auth-module-options.interface.ts:15](https://github.com/joonashak/nestjs-eve-auth/blob/2fa8073/lib/src/eve-auth-module-options.interface.ts#L15)

___

### clientId

• **clientId**: `string`

Your app's EVE SSO Client ID.

#### Defined in

[lib/src/eve-auth-module-options.interface.ts:4](https://github.com/joonashak/nestjs-eve-auth/blob/2fa8073/lib/src/eve-auth-module-options.interface.ts#L4)

___

### revocationUrl

• `Optional` **revocationUrl**: `string`

EVE SSO Token Verification URL.

It is not necessary to set this in normal use. This option is provided for
redundancy.

#### Defined in

[lib/src/eve-auth-module-options.interface.ts:45](https://github.com/joonashak/nestjs-eve-auth/blob/2fa8073/lib/src/eve-auth-module-options.interface.ts#L45)

___

### scopes

• `Optional` **scopes**: `string`[]

Permission scopes to request in SSO.

#### Defined in

[lib/src/eve-auth-module-options.interface.ts:17](https://github.com/joonashak/nestjs-eve-auth/blob/2fa8073/lib/src/eve-auth-module-options.interface.ts#L17)

___

### secretKey

• **secretKey**: `string`

Your app's EVE SSO Secret Key.

#### Defined in

[lib/src/eve-auth-module-options.interface.ts:6](https://github.com/joonashak/nestjs-eve-auth/blob/2fa8073/lib/src/eve-auth-module-options.interface.ts#L6)

___

### tokenUrl

• `Optional` **tokenUrl**: `string`

EVE SSO Token URL.

It is not necessary to set this in normal use. This option is provided for
redundancy.

#### Defined in

[lib/src/eve-auth-module-options.interface.ts:31](https://github.com/joonashak/nestjs-eve-auth/blob/2fa8073/lib/src/eve-auth-module-options.interface.ts#L31)

___

### verifyUrl

• `Optional` **verifyUrl**: `string`

EVE SSO Token Verification URL.

It is not necessary to set this in normal use. This option is provided for
redundancy.

#### Defined in

[lib/src/eve-auth-module-options.interface.ts:38](https://github.com/joonashak/nestjs-eve-auth/blob/2fa8073/lib/src/eve-auth-module-options.interface.ts#L38)
