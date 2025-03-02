# Class: SsoService

## Methods

### callback

▸ **callback**(`«destructured»`, `session`):
`Promise`\<[`EveSsoCallbackResult`](EveSsoCallbackResult.md)\>

#### Parameters

| Name             | Type                                              |
| :--------------- | :------------------------------------------------ |
| `«destructured»` | [`EveSsoCallbackParams`](EveSsoCallbackParams.md) |
| `session`        | `ExpressSession`                                  |

#### Returns

`Promise`\<[`EveSsoCallbackResult`](EveSsoCallbackResult.md)\>

#### Defined in

[lib/src/sso/sso.service.ts:24](https://github.com/joonashak/nestjs-eve-auth/blob/2fa8073/lib/src/sso/sso.service.ts#L24)

---

### refreshTokens

▸ **refreshTokens**(`refreshToken`): `Promise`\<`SsoTokens`\>

Refresh SSO tokens using refresh token.

Note that the refresh token may change as well.

#### Parameters

| Name           | Type     |
| :------------- | :------- |
| `refreshToken` | `string` |

#### Returns

`Promise`\<`SsoTokens`\>

#### Defined in

[lib/src/sso/sso.service.ts:69](https://github.com/joonashak/nestjs-eve-auth/blob/2fa8073/lib/src/sso/sso.service.ts#L69)

---

### revokeRefreshToken

▸ **revokeRefreshToken**(`refreshToken`): `Promise`\<`void`\>

Revoke SSO refresh token.

Note that EVE SSO provides no information of whether or not the token was actually revoked.

#### Parameters

| Name           | Type     |
| :------------- | :------- |
| `refreshToken` | `string` |

#### Returns

`Promise`\<`void`\>

#### Defined in

[lib/src/sso/sso.service.ts:60](https://github.com/joonashak/nestjs-eve-auth/blob/2fa8073/lib/src/sso/sso.service.ts#L60)
