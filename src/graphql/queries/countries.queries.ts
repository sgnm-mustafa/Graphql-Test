import gql from "graphql-tag";

export const GET_COUNTRIES = gql` 
query Countries  @api(name: country){
    countries {
      name
      capital
      continent {
        name
      }
    }
  }
`

