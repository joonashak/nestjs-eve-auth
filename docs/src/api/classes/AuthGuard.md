# Class: AuthGuard

Allow only users authenticated by `nestjs-eve-auth`.

## Implements

- `CanActivate`

## Constructors

### constructor

• **new AuthGuard**(): [`AuthGuard`](AuthGuard.md)

#### Returns

[`AuthGuard`](AuthGuard.md)

## Methods

### canActivate

▸ **canActivate**(`context`): `boolean` \| `Promise`\<`boolean`\> \| `Observable`\<`boolean`\>

#### Parameters

| Name      | Type               |
| :-------- | :----------------- |
| `context` | `ExecutionContext` |

#### Returns

`boolean` \| `Promise`\<`boolean`\> \| `Observable`\<`boolean`\>

#### Implementation of

CanActivate.canActivate

#### Defined in

[lib/src/guards/auth.guard.ts:12](https://github.com/joonashak/nestjs-eve-auth/blob/2fa8073/lib/src/guards/auth.guard.ts#L12)
