import type {StructureResolver} from 'sanity/structure'
import {DocumentVideoIcon} from '@sanity/icons'

export const structure: StructureResolver = (S) =>
  S.list()
    .id('root')
    .title('Content')
    .items([
      S.documentTypeListItem('film').title('Films').icon(DocumentVideoIcon)
    ])