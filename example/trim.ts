import { readFile, writeFile } from 'fs/promises'

function removeEmptyLines(inputString: string): string {
    // Split the input string into lines
    const lines = inputString.split('\n')

    // Filter out empty lines from the array
    const nonEmptyLines = lines.filter((line) => line.trim() !== '')

    // Join the non-empty lines back into a single string
    const cleanedString = nonEmptyLines.join('\n')

    return cleanedString
}

function removeComment(graphqlString: string): string {
    // Define a regular expression pattern to match GraphQL comments (both single-line and multiline)
    const pattern = /#.*?(?=\n|$)|("""[\s\S]*?""")/g

    // Use String.replace() to remove all occurrences of comments from the GraphQL string
    const cleanedString = graphqlString.replace(pattern, '')

    return removeEmptyLines(cleanedString)
}

const gql = await readFile(import.meta.dir + '/spx.gql', {
    encoding: 'utf8'
})

writeFile(import.meta.dir + '/sp.gql', removeComment(gql))
