# Class: SessionStateNotFound

## Hierarchy

- [`EveAuthException`](EveAuthException.md)

  ↳ **`SessionStateNotFound`**

## Constructors

### constructor

• **new SessionStateNotFound**(): [`SessionStateNotFound`](SessionStateNotFound.md)

#### Returns

[`SessionStateNotFound`](SessionStateNotFound.md)

#### Overrides

[EveAuthException](EveAuthException.md).[constructor](EveAuthException.md#constructor)

#### Defined in

[lib/src/exceptions/session-state-not-found.exception.ts:8](https://github.com/joonashak/nestjs-eve-auth/blob/2fa8073/lib/src/exceptions/session-state-not-found.exception.ts#L8)

## Methods

### getResponse

▸ **getResponse**(): `string` \| `object`

#### Returns

`string` \| `object`

#### Inherited from

[EveAuthException](EveAuthException.md).[getResponse](EveAuthException.md#getresponse)

#### Defined in

lib/node_modules/@nestjs/common/exceptions/http.exception.d.ts:68

---

### getStatus

▸ **getStatus**(): `number`

#### Returns

`number`

#### Inherited from

[EveAuthException](EveAuthException.md).[getStatus](EveAuthException.md#getstatus)

#### Defined in

lib/node_modules/@nestjs/common/exceptions/http.exception.d.ts:69

---

### initCause

▸ **initCause**(): `void`

Configures error chaining support

#### Returns

`void`

**`See`**

- https://nodejs.org/en/blog/release/v16.9.0/#error-cause
- https://github.com/microsoft/TypeScript/issues/45167

#### Inherited from

[EveAuthException](EveAuthException.md).[initCause](EveAuthException.md#initcause)

#### Defined in

lib/node_modules/@nestjs/common/exceptions/http.exception.d.ts:65

---

### initMessage

▸ **initMessage**(): `void`

#### Returns

`void`

#### Inherited from

[EveAuthException](EveAuthException.md).[initMessage](EveAuthException.md#initmessage)

#### Defined in

lib/node_modules/@nestjs/common/exceptions/http.exception.d.ts:66

---

### initName

▸ **initName**(): `void`

#### Returns

`void`

#### Inherited from

[EveAuthException](EveAuthException.md).[initName](EveAuthException.md#initname)

#### Defined in

lib/node_modules/@nestjs/common/exceptions/http.exception.d.ts:67

---

### captureStackTrace

▸ **captureStackTrace**(`targetObject`, `constructorOpt?`): `void`

Create .stack property on a target object

#### Parameters

| Name              | Type       |
| :---------------- | :--------- |
| `targetObject`    | `object`   |
| `constructorOpt?` | `Function` |

#### Returns

`void`

#### Inherited from

[EveAuthException](EveAuthException.md).[captureStackTrace](EveAuthException.md#capturestacktrace)

#### Defined in

lib/node_modules/@types/node/globals.d.ts:4

---

### createBody

▸ **createBody**(`nil`, `message`, `statusCode`): `HttpExceptionBody`

#### Parameters

| Name         | Type                       |
| :----------- | :------------------------- |
| `nil`        | `""`                       |
| `message`    | `HttpExceptionBodyMessage` |
| `statusCode` | `number`                   |

#### Returns

`HttpExceptionBody`

#### Inherited from

[EveAuthException](EveAuthException.md).[createBody](EveAuthException.md#createbody)

#### Defined in

lib/node_modules/@nestjs/common/exceptions/http.exception.d.ts:70

▸ **createBody**(`message`, `error`, `statusCode`): `HttpExceptionBody`

#### Parameters

| Name         | Type                       |
| :----------- | :------------------------- |
| `message`    | `HttpExceptionBodyMessage` |
| `error`      | `string`                   |
| `statusCode` | `number`                   |

#### Returns

`HttpExceptionBody`

#### Inherited from

[EveAuthException](EveAuthException.md).[createBody](EveAuthException.md#createbody)

#### Defined in

lib/node_modules/@nestjs/common/exceptions/http.exception.d.ts:71

▸ **createBody**\<`Body`\>(`custom`): `Body`

#### Type parameters

| Name   | Type                                    |
| :----- | :-------------------------------------- |
| `Body` | extends `Record`\<`string`, `unknown`\> |

#### Parameters

| Name     | Type   |
| :------- | :----- |
| `custom` | `Body` |

#### Returns

`Body`

#### Inherited from

[EveAuthException](EveAuthException.md).[createBody](EveAuthException.md#createbody)

#### Defined in

lib/node_modules/@nestjs/common/exceptions/http.exception.d.ts:72

---

### extractDescriptionAndOptionsFrom

▸ **extractDescriptionAndOptionsFrom**(`descriptionOrOptions`): `DescriptionAndOptions`

Utility method used to extract the error description and httpExceptionOptions from the given
argument. This is used by inheriting classes to correctly parse both options.

#### Parameters

| Name                   | Type                               |
| :--------------------- | :--------------------------------- |
| `descriptionOrOptions` | `string` \| `HttpExceptionOptions` |

#### Returns

`DescriptionAndOptions`

the error description and the httpExceptionOptions as an object.

#### Inherited from

[EveAuthException](EveAuthException.md).[extractDescriptionAndOptionsFrom](EveAuthException.md#extractdescriptionandoptionsfrom)

#### Defined in

lib/node_modules/@nestjs/common/exceptions/http.exception.d.ts:80

---

### getDescriptionFrom

▸ **getDescriptionFrom**(`descriptionOrOptions`): `string`

#### Parameters

| Name                   | Type                               |
| :--------------------- | :--------------------------------- |
| `descriptionOrOptions` | `string` \| `HttpExceptionOptions` |

#### Returns

`string`

#### Inherited from

[EveAuthException](EveAuthException.md).[getDescriptionFrom](EveAuthException.md#getdescriptionfrom)

#### Defined in

lib/node_modules/@nestjs/common/exceptions/http.exception.d.ts:73

---

### getHttpExceptionOptionsFrom

▸ **getHttpExceptionOptionsFrom**(`descriptionOrOptions`): `HttpExceptionOptions`

#### Parameters

| Name                   | Type                               |
| :--------------------- | :--------------------------------- |
| `descriptionOrOptions` | `string` \| `HttpExceptionOptions` |

#### Returns

`HttpExceptionOptions`

#### Inherited from

[EveAuthException](EveAuthException.md).[getHttpExceptionOptionsFrom](EveAuthException.md#gethttpexceptionoptionsfrom)

#### Defined in

lib/node_modules/@nestjs/common/exceptions/http.exception.d.ts:74

## Properties

### cause

• **cause**: `unknown`

#### Inherited from

[EveAuthException](EveAuthException.md).[cause](EveAuthException.md#cause)

#### Defined in

lib/node_modules/@nestjs/common/exceptions/http.exception.d.ts:58

---

### message

• **message**: `string`

#### Inherited from

[EveAuthException](EveAuthException.md).[message](EveAuthException.md#message)

#### Defined in

docs/node_modules/typescript/lib/lib.es5.d.ts:1068

---

### name

• **name**: `string`

#### Inherited from

[EveAuthException](EveAuthException.md).[name](EveAuthException.md#name)

#### Defined in

docs/node_modules/typescript/lib/lib.es5.d.ts:1067

---

### stack

• `Optional` **stack**: `string`

#### Inherited from

[EveAuthException](EveAuthException.md).[stack](EveAuthException.md#stack)

#### Defined in

docs/node_modules/typescript/lib/lib.es5.d.ts:1069

---

### prepareStackTrace

▪ `Static` `Optional` **prepareStackTrace**: (`err`: `Error`, `stackTraces`: `CallSite`[]) => `any`

#### Type declaration

▸ (`err`, `stackTraces`): `any`

Optional override for formatting stack traces

##### Parameters

| Name          | Type         |
| :------------ | :----------- |
| `err`         | `Error`      |
| `stackTraces` | `CallSite`[] |

##### Returns

`any`

**`See`**

https://v8.dev/docs/stack-trace-api#customizing-stack-traces

#### Inherited from

[EveAuthException](EveAuthException.md).[prepareStackTrace](EveAuthException.md#preparestacktrace)

#### Defined in

lib/node_modules/@types/node/globals.d.ts:11

---

### stackTraceLimit

▪ `Static` **stackTraceLimit**: `number`

#### Inherited from

[EveAuthException](EveAuthException.md).[stackTraceLimit](EveAuthException.md#stacktracelimit)

#### Defined in

lib/node_modules/@types/node/globals.d.ts:13
