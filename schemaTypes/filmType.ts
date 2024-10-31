import {defineField, defineType} from 'sanity'

export const filmType = defineType({
  name: 'film',
  title: 'Film',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      type: 'string',
    }),
    defineField({
      name: 'slug',
      type: 'slug',
      options: {source: 'title'},
      validation: (rule) => rule.required().error(`Required to generate a page on the website`),
    }),
    defineField({
      name: 'date',
      type: 'datetime',
    }),
    defineField({
      name: 'vimeo',
      type: 'url',
    }),
    defineField({
      name: 'images',
      type: 'array',
      of: [{type: 'image' }],
      hidden: ({parent}) => !!parent?.vimeo,
      validation: (rule) => rule.custom((value, context) => {
        const parent = context.parent as { vimeo?: string };
        if (!parent.vimeo && !value) {
          return 'Placeholder image is required if a URL is not provided';
        }
        return true;
      }),
    }),
    defineField({
      name: 'details',
      type: 'array',
      of: [{type: 'block'}],
    }),
  ],
  preview: {
    select: {
      name: 'title',
      artist: 'headline.title',
      date: 'date',
      image: 'image',
    },
    prepare({name, artist, date, image}) {
      const nameFormatted = name || 'Untitled film'
      // const dateFormatted = date
      //   ? new Date(date).toLocaleDateString(undefined, {
      //       month: 'short',
      //       day: 'numeric',
      //       year: 'numeric',
      //       hour: 'numeric',
      //       minute: 'numeric',
      //     })
      //   : 'No date'

      return {
        title: artist ? `${nameFormatted} (${artist})` : nameFormatted,
        // subtitle: venue ? `${dateFormatted} at ${venue}` : dateFormatted,
        media: image,
      }
    },
  },
})
