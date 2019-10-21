function runFilter(searchArray, dataset, fields, inclusive) {
  // Find all matches for all search terms in searchArray and put into collection
  const collection = searchFieldSet(searchArray, dataset, fields);

  // Combine or intersect collection results depending on 'inclusive'
  if (collection.length > 0) {
    // Return inclusive array
    if (inclusive) return [...new Set(collection.flat())];

    // Return intersecting array (exclusive)
    return collection.reduce((a, c) => a.filter(i => c.includes(i)));
  }

  // If collection has no values, return empty array
  return [];
}

function searchFieldSet(searchArray, data, fields) {
  // Creates array of searchable fields based on value of field.searchable
  const requiredFields = fields
    .filter(field => field.searchable === true)
    .map(field => field.key);

  // Searches those fields for each string in searchArray
  return searchArray.map(value => {
    return data.filter(item => {
      // Returns item if the string is found in one of the fields
      return requiredFields
        .map(field => item[field].toLowerCase().includes(value))
        .some(val => val === true);
    });
  });
}

export const searchData = (
  searchParams,
  dataCollection,
  fields,
  returnEmptySubset
) => {
  // Destructure searchParams into the search string, and filter method
  const {searchString, isInclusive} = searchParams;

  // Display all data by default if there is no search string.
  if (dataCollection && searchString === '') {
    return returnEmptySubset ? [] : dataCollection;
  }

  // Filter all data if there is a non-empty search string
  if (dataCollection && searchString !== '') {
    // Separate out an array of quoted strings from the searchString
    const quotedValues = [
      ...[...searchString.matchAll(/"([^"]+)"/g)].map(i => i[1].toLowerCase())
    ];

    // Create an array from searchString without these inquoted values
    const searchArrayWithoutQuotedValues = searchString
      // Strip out remaining double-quote characters
      .replace(/"/gi, '')
      // Strip out quoted values
      .replace(new RegExp(quotedValues.join('|'), 'gi'), '')
      .toLowerCase()
      .split(' ')
      // Remove any empty items, otherwise all will match once filtered
      .filter(item => item !== '');

    // Filter dataCollection and intersect returned arrays according to isInclusive value.
    const initialFilteredValues = runFilter(
      searchArrayWithoutQuotedValues,
      dataCollection,
      fields,
      isInclusive
    );

    if (quotedValues.length > 0 && initialFilteredValues.length > 0) {
      // Will return a subset based on regular and enquoted values
      return runFilter(
        quotedValues,
        initialFilteredValues,
        fields,
        isInclusive
      );
    }

    if (quotedValues.length > 0) {
      // Will return a subset based only enquoted search strings.
      return runFilter(quotedValues, dataCollection, fields, isInclusive);
    }

    // Will return a subset based on regular search string
    return initialFilteredValues;
  }

  // Returns an empty array if there is no dataCollection passed through
  // This means the subset will not be undefined and so rendering will not fall over
  return [];
};

export const searchArray = searchParams => {
  const {searchString} = searchParams;
  const quotedValues = [
    ...[...searchString.matchAll(/"([^"]+)"/g)].map(i => i[1].toLowerCase())
  ];

  // Create an array from searchString without these inquoted values
  const searchArrayWithoutQuotedValues = searchString
    // Strip out remaining double-quote characters
    .replace(/"/gi, '')
    // Strip out quoted values
    .replace(new RegExp(quotedValues.join('|'), 'gi'), '')
    .toLowerCase()
    .split(' ')
    // Remove any empty items, otherwise all will match once filtered
    .filter(item => item !== '');

  return searchArrayWithoutQuotedValues.concat(quotedValues);
};
