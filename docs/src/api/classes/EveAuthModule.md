# Class: EveAuthModule

Main module of `nestjs-eve-auth` library.

Provides configuration to the library and exports its public API. You can
import this simply in your application's root module or encapsulate it in
another module.

## Hierarchy

- `ConfigurableEveAuthModule`

  ↳ **`EveAuthModule`**

## Constructors

### constructor

• **new EveAuthModule**(): [`EveAuthModule`](EveAuthModule.md)

#### Returns

[`EveAuthModule`](EveAuthModule.md)

#### Inherited from

ConfigurableEveAuthModule.constructor

#### Defined in

lib/node_modules/@nestjs/common/module-utils/interfaces/configurable-module-cls.interface.d.ts:12

## Properties

### forRoot

▪ `Static` **forRoot**: (`options`: [`EveAuthModuleOptions`](../interfaces/EveAuthModuleOptions.md) & `Partial`\<{}\>) => `DynamicModule`

#### Type declaration

▸ (`options`): `DynamicModule`

Configure `nestjs-eve-auth` and return the module for
  importing in a Nest.js module definition. See [configuration
  docs](https://joonashak.github.io/nestjs-eve-auth/usage/configuration.html).

##### Parameters

| Name | Type |
| :------ | :------ |
| `options` | [`EveAuthModuleOptions`](../interfaces/EveAuthModuleOptions.md) & `Partial`\<{}\> |

##### Returns

`DynamicModule`

#### Inherited from

ConfigurableEveAuthModule.forRoot

___

### forRootAsync

▪ `Static` **forRootAsync**: (`options`: `ConfigurableModuleAsyncOptions`\<[`EveAuthModuleOptions`](../interfaces/EveAuthModuleOptions.md), ``"create"``\> & `Partial`\<{}\>) => `DynamicModule`

#### Type declaration

▸ (`options`): `DynamicModule`

Configure `nestjs-eve-auth` asynchronously and return
  the module for importing in a Nest.js module definition. See [configuration
  docs](https://joonashak.github.io/nestjs-eve-auth/usage/configuration.html).

##### Parameters

| Name | Type |
| :------ | :------ |
| `options` | `ConfigurableModuleAsyncOptions`\<[`EveAuthModuleOptions`](../interfaces/EveAuthModuleOptions.md), ``"create"``\> & `Partial`\<{}\> |

##### Returns

`DynamicModule`

#### Inherited from

ConfigurableEveAuthModule.forRootAsync
