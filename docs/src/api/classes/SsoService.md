# Class: SsoService

## Methods

### callback

▸ **callback**(`«destructured»`, `session`): `Promise`\<[`EveSsoCallbackResult`](EveSsoCallbackResult.md)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `«destructured»` | [`EveSsoCallbackParams`](EveSsoCallbackParams.md) |
| `session` | `ExpressSession` |

#### Returns

`Promise`\<[`EveSsoCallbackResult`](EveSsoCallbackResult.md)\>

#### Defined in

[lib/src/sso/sso.service.ts:26](https://github.com/joonashak/nestjs-eve-auth/blob/db41b3e/lib/src/sso/sso.service.ts#L26)

___

### logout

▸ **logout**(`refreshToken`, `session`): `Promise`\<`void`\>

Log out, destroying session and revoking SSO refresh token.

#### Parameters

| Name | Type |
| :------ | :------ |
| `refreshToken` | `string` |
| `session` | `ExpressSession` |

#### Returns

`Promise`\<`void`\>

#### Defined in

[lib/src/sso/sso.service.ts:59](https://github.com/joonashak/nestjs-eve-auth/blob/db41b3e/lib/src/sso/sso.service.ts#L59)

___

### refreshTokens

▸ **refreshTokens**(`refreshToken`): `Promise`\<`SsoTokens`\>

Refresh SSO tokens using refresh token.

Note that the refresh token may change as well.

#### Parameters

| Name | Type |
| :------ | :------ |
| `refreshToken` | `string` |

#### Returns

`Promise`\<`SsoTokens`\>

#### Defined in

[lib/src/sso/sso.service.ts:69](https://github.com/joonashak/nestjs-eve-auth/blob/db41b3e/lib/src/sso/sso.service.ts#L69)
