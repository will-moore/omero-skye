
import { PUBLIC_BASE_URL as BASE_URL } from '$env/static/public';

export async function load({ fetch, params }) {

    let annTypes = {
        "MapAnnotationI": "Key-Value Pairs",
        "TagAnnotationI": "Tags",
        "FileAnnotationI": "Attachments",
        "CommentAnnotationI": "Comments",
        "LongAnnotationI": "Rating",  // TODO: check namespace for rating
    }
    const url = `${BASE_URL}/webclient/api/annotations/?${params.otype}=${params.id}`
	const res = await fetch(url);
	const data = await res.json();

    var experimenters = [];
    // var batchAnn = objects.length > 1;
    if (data.experimenters.length > 0) {
        // manipulate data...
        // make an object of eid: experimenter
        experimenters = data.experimenters.reduce(function(prev, exp){
            prev[exp.id + ""] = exp;
            return prev;
        }, {});
    }

    var populate_experimenter = function(ann) {
        if (data.experimenters.length > 0) {
            ann.owner = experimenters[ann.owner.id];
        }
        if (ann.link && ann.link.owner) {
            ann.link.owner = experimenters[ann.link.owner.id];
            // AddedBy IDs for filtering
            ann.addedBy = [ann.link.owner.id];
        }
        return ann;
    };

    // Populate experimenters within anns
    var anns = data.annotations.map(populate_experimenter);

    var inh_map_annotations = [];
    if (data.hasOwnProperty("parents")){
        data.parents.annotations.forEach(function(ann) {
            ann = populate_experimenter(ann);
            let class_ = ann.link.parent.class;
            let id_ = '' + ann.link.parent.id;
            let children = data.parents.lineage[class_][id_];
            class_ = children[0].class;
            ann.childClass = class_.substring(0, class_.length - 1);
            ann.childNames = [];
            if (children[0].hasOwnProperty("name")){
                for(let j = 0; j < children.length; j++){
                    ann.childNames.push(children[j].name);
                }
            }
            inh_map_annotations.push(ann);
        });
    }

    console.log(data);

    // organise all annotations by type 'class'
    const annsByType = {}
    data.annotations.forEach(ann => {
        let annType = ann.class;
        // Convert key to e.g. "Key-Value Pairs"
        if (annTypes[annType]) {
            annType = annTypes[annType];
        }
        if (!annsByType[annType]) {
            annsByType[annType] = [];
        }
        annsByType[annType].push(ann);
    });

	return {annotations: annsByType};
}
