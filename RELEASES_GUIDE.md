# Releases Update Guide

This guide explains how to update the releases page by modifying the `public/releases.json` file.

## Adding a New Release

To add a new release, edit the `public/releases.json` file and add a new release object at the beginning of the `releases` array (newest first).

### Basic Release Structure

```json
{
  "version": "2.3.0",
  "date": "June 1, 2025", 
  "daysAgo": "1 day ago",
  "title": "Macwrite AI version 2.3.0",
  "newFeatures": [
    "Feature description with **bold text** and `code snippets`",
    "Another feature description"
  ],
  "fixes": [
    "Bug fix description",
    "Another fix"
  ],
  "notes": "Thank you for using Macwrite AI!"
}
```

### Advanced Release with Sections

For major releases with multiple sections:

```json
{
  "version": "3.0.0",
  "date": "July 1, 2025",
  "daysAgo": "2 days ago", 
  "title": "Macwrite AI version 3.0.0",
  "description": "This major release brings exciting new features:",
  "sections": [
    {
      "title": "New AI Models 🧠",
      "content": "We've added support for the latest **GPT-5** model with improved reasoning capabilities.",
      "features": [
        "GPT-5 integration with 10x faster responses",
        "Improved context understanding"
      ]
    },
    {
      "title": "Enhanced UI 🎨", 
      "features": [
        "Dark mode improvements",
        "Better accessibility features"
      ]
    }
  ],
  "notes": "Thank you for choosing Macwrite AI!"
}
```

## Field Descriptions

- **version**: Version number (e.g., "2.3.0")
- **date**: Release date in readable format
- **daysAgo**: Relative time since release  
- **title**: Full title of the release
- **description**: Optional description paragraph
- **newFeatures**: Array of new feature descriptions
- **fixes**: Array of bug fixes and improvements
- **sections**: For complex releases with multiple categories
- **notes**: Closing message/thank you note

## Text Formatting

The releases page supports basic markdown-style formatting:

- `**bold text**` - Makes text bold
- `` `code` `` - Formats text as code with monospace font
- Regular text appears in gray

## Tips

1. Always add new releases at the top of the array
2. The first release automatically gets a "Latest" badge
3. Keep descriptions concise but informative
4. Use emojis in section titles for visual appeal
5. Test the page after making changes

## Example Workflow

1. Open `public/releases.json`
2. Add your new release object at the beginning of the `releases` array
3. Save the file
4. The changes will automatically appear on the `/releases` page

The releases page will automatically fetch and display the updated content! 