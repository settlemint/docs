import { gql, GraphQLClient } from 'graphql-request';
type SmartContractTemplate = {
  id: string;
  name: string;
  featureflagged: boolean;
};

type SmartContractTemplateResult = {
  config: {
    smartContractSets: {
      id: string;
      sets: SmartContractTemplate[];
    };
  };
};
const GRAPHQL_ENDPOINT = 'https://console.settlemint.com/api/graphql';

const query = gql`
  query platformConfig {
    config {
      smartContractSets {
        id
        sets {
          id
          name
          featureflagged
          __typename
        }
        __typename
      }
      __typename
    }
  }
`;

async function generateMarkdownTemplates() {
  const client = new GraphQLClient(GRAPHQL_ENDPOINT);

  try {
    const response = await client.request<SmartContractTemplateResult>(query);

    // Generate markdown for each set
    const markdownStrings = response.config.smartContractSets.sets
      .filter(set => !set.featureflagged) // Optional: skip feature flagged items
      .map(
        set => `
- [${set.name}](https://github.com/settlemint/${set.id})
`
      )
      .join('\n');

    console.log('Generated Markdown:');
    console.log(markdownStrings);
    return markdownStrings;
  } catch (error) {
    console.error('Error generating markdown:', error);
    throw error;
  }
}

// Call the function
generateMarkdownTemplates();
