# proto2graphql [![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/facebook/react/blob/master/LICENSE) [![npm version](https://img.shields.io/npm/v/proto2graphql.svg?style=flat)](https://www.npmjs.com/package/proto2graphql) [![CircleCI Status](https://circleci.com/gh/emzeq/proto2graphql.svg?style=shield&circle-token=:circle-token)](https://circleci.com/gh/emzeq/proto2graphql) [![Coverage Status](https://coveralls.io/repos/github/emzeq/proto2graphql/badge.svg)](https://coveralls.io/github/emzeq/proto2graphql)

Converts schema definitions in Protocol Buffer (proto3) to GraphQL

## Installation

`npm install -g proto2graphql`

## Usage

`proto2graphql --input [path to .proto] --output [path to .graphql]`

## Conversions

### Messages

#### Protocol Buffer

```protobuf
message SearchRequest {
  string query = 1;
  int32 page_number = 2;
  int32 result_per_page = 3;
}
```

#### GraphQL

```graphql
type SearchRequest {
  query: String
  pageNumber: Int
  resultPerPage: Int
}
```

### Scalar Value Types

| Protocol Buffer | GraphQL |
| --------------: | ------: |
|          double |   Float |
|           float |   Float |
|           int32 |     Int |
|           int64 |     Int |
|          uint32 |     Int |
|          uint64 |     Int |
|          sint32 |     Int |
|          sint64 |     Int |
|         fixed32 |     Int |
|         fixed64 |     Int |
|        sfixed32 |     Int |
|        sfixed64 |     Int |
|            bool | Boolean |
|          string |  String |
|           bytes |  String |

### Enumerations

#### Protocol Buffer

```protobuf
enum Corpus {
  UNIVERSAL = 0;
  WEB = 1;
  IMAGES = 2;
  LOCAL = 3;
  NEWS = 4;
  PRODUCTS = 5;
  VIDEO = 6;
}
```

#### GraphQL

```graphql
enum Corpus {
  UNIVERSAL
  WEB
  IMAGES
  LOCAL
  NEWS
  PRODUCTS
  VIDEO
}
```

### Nested Types

#### Protocol Buffer

```protobuf
message SearchResponse {
  message Result {
    string url = 1;
    string title = 2;
  }
  Result result = 1;
}
```

#### GraphQL

```graphql
type SearchResponse {
  results: SearchResponse_Result
}

type SearchResponse_Result {
  url: String
  title: String
}
```

### Oneof

#### Protocol Buffer

```protobuf
message UserAuth {
  message GoogleProvider {
    int32 gid = 1;
  }

  message FacebookProvider {
    string fbid = 1;
  }

  oneof provider {
    GoogleProvider google = 1;
    FacebookProvider facebook = 2;
    string generic = 3;
  }
}
```

#### GraphQL

```graphql
type UserAuth {
  provider: UserAuth_provider
}

union UserAuth_provider =
    UserAuth_GoogleProvider
  | UserAuth_FacebookProvider
  | String

type UserAuth_GoogleProvider {
  gid: Int
}

type UserAuth_FacebookProvider {
  fbid: String
}
```

### Maps

#### Protocol Buffer

```protobuf
message User {
  map<string, Attribute> attributes = 1;
}

message Attribute {
  string value = 1;
}
```

#### GraphQL

```graphql
type User {
  attributes: [String_Attribute_Map]
}

type String_Attribute_Map {
  key: String
  value: Attribute
}

type Attribute {
  value: String
}
```

### Packages

#### Protocol Buffer

```protobuf
package proto2graphql.common;

message TypeA {
  int32 field = 1;
}
```

#### GraphQL

```graphql
type proto2graphql_common_TypeA {
  field: Int
}
```

### Well-Known Types

#### Protocol Buffer

```protobuf
import "google/protobuf/duration.proto";
import "google/protobuf/timestamp.proto";

message WellKnownTypes {
  google.protobuf.Duration duration_field = 1;
  google.protobuf.Timestamp timestamp_field = 2;
}
```

#### GraphQL

```graphql
type WellKnownTypes {
  durationField: google_protobuf_Duration
  timestampField: google_protobuf_Timestamp
}

type google_protobuf_Duration {
  seconds: Int
  nanos: Int
}

type google_protobuf_Timestamp {
  seconds: Int
  nanos: Int
}
```
