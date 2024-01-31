import {defineConfig} from 'sanity'
import {deskTool} from 'sanity/desk'
import {visionTool} from '@sanity/vision'
// import {visionTool} from "@sanity/types/"
import {schemaTypes} from './schemas'

export default defineConfig({
  name: 'default',
  title: 'Sanity Eco',

  projectId: 'klqxodq0',
  dataset: 'production',

  plugins: [deskTool(), visionTool()],

  schema: {
    types: schemaTypes,
  },
})
