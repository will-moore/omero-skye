

export async function load({ fetch, params }) {
	console.log('annotations params', params, params.otype);

    let annTypes = {
        "MapAnnotationI": "Key-Value Pairs",
        "TagAnnotaionI": "Tags",
        "FileAnnotationI": "Attachments",
        "CommentAnnotationI": "Comments",
        "LongAnnotationI": "Rating",  // TODO: check namespace for rating
    }
    const url = `https://idr.openmicroscopy.org/webclient/api/annotations/?${params.otype}=${params.id}`
	const res = await fetch(url);
	const jsonData = await res.json();
    console.log('jsonData', jsonData);
    // TODO: populate jsonData.annotations with jsonData.experimenters

    // organise all annotations by type 'class'
    const anns = {}
    jsonData.annotations.forEach(ann => {
        let annType = ann.class;
        // Convert key to e.g. "Key-Value Pairs"
        if (annTypes[annType]) {
            annType = annTypes[annType];
        }
        if (!anns[annType]) {
            anns[annType] = [];
        }
        anns[annType].push(ann);
    });

	return {annotations: anns};
}
