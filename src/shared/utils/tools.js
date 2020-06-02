import cookie from 'cookie';
import day from 'dayjs';
import capitalize from 'lodash/capitalize';
import differenceBy from 'lodash/differenceBy';
import pick from 'lodash/pick';
import jsonexport from 'jsonexport/dist';
import fileSaver from 'file-saver';
import qs from 'qs';

export function getValidationResult(data, schema) {
  try {
    schema.validateSync(data, { abortEarly: false, allowUnknown: true });
    return {
      errors: {},
      isValid: true,
    };
  } catch (err) {
    const errors = err.inner
      .reduce((acc, el) => {
        const { path, message } = el;
        acc[path] = message;
        return acc;
      }, {});
    return { isValid: false, errors };
  }
}

export function validateTextEditor(editorContent, key, label = capitalize(key)) {
  const isValid = editorContent && editorContent.blocks.some(block => block.text.trim());
  return !isValid ? { [key]: `${label} is required` } : {};
}

export function formatMonthYearToISO(data, keys = ['start_date', 'end_date']) {
  return keys.reduce((acc, key) => {
    const value = acc[key];
    acc[key] = value ? day(value).date(30).toISOString() : '';
    return acc;
  }, { ...data });
}

export function formatISOToDate(data, keys = ['start_date', 'end_date'], format = 'YYYY-MM') {
  return keys.reduce((acc, key) => {
    const value = acc[key];
    acc[key] = value ? day(value).format(format) : '';
    return acc;
  }, { ...data });
}

export function formatDateToISO(data, keys = ['start_date', 'end_date'], format = 'YYYY-MM') {
  return keys.reduce((acc, key) => {
    const value = acc[key];
    acc[key] = value ? day(value, format).toISOString() : '';
    return acc;
  }, { ...data });
}

// export function getFileLink(data) {
//   return `${process.env.API_URL}/file/download?${queryString.stringify(data)}`;
// }

export function getDownloadFilename(headers = {}) {
  const { 'content-disposition': disposition = '' } = headers;
  const keyValue = disposition.split(';').find(e => e.includes('filename')) || '';
  const [, filename] = keyValue.split('=');
  return filename;
}

export async function delay(ms = 1000) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

export function parseCookies(req, options = {}) {
  return cookie.parse(req ? req.headers.cookie || '' : document.cookie, options);
}

export function fieldIsRequired({ label, path }) {
  const display = label || path
    .split('.')
    .pop()
    .split('_')
    .filter(e => e !== 'id')
    .map(capitalize)
    .join(' ');
  return `${display} is required`;
}

export function fieldIsInvalid({ label, path }) {
  const display = label || path
    .split('.')
    .pop()
    .split('_')
    .filter(e => e !== 'id')
    .map(capitalize)
    .join(' ');
  return `${display} is required`;
}

export function getImpactDriver(stage) {
  const max = Math.max(...Object.values(stage));
  const keys = Object.keys(stage)
    .filter(e => stage[e] === max);

  return ['financial', 'reputation', 'operational', 'legal_compliance', 'health_safety_security', 'management_action'].find(e => keys.includes(e));
}

export function getVulnerabilityLevel(vulnerability) {
  let level = 'low';
  const isModerate = vulnerability > 3 && vulnerability < 9;
  const isHigh = vulnerability > 8 && vulnerability < 15;
  const isCritical = vulnerability > 14;
  if (isModerate) {
    level = 'moderate';
  } else if (isHigh) {
    level = 'high';
  } else if (isCritical) {
    level = 'critical';
  }
  return level;
}

export function getArrayDiff(old, updated) {
  const removed = differenceBy(old, updated, 'id').map(e => ({ ...e, action: 'remove' }));
  const added = differenceBy(updated, old, 'id').map(e => ({ ...e, action: 'add' }));
  return removed.concat(added);
}

export function getRecentChanges(oldData, newData, keys) {
  return keys
    .reduce((acc, el) => {
      acc = {
        ...acc,
        [el]: getArrayDiff(oldData[el] || [], newData[el] || []),
      };
      return acc;
    }, { ...newData.recent_changes });
}

export function exportCsv(data, fields, filename) {
  jsonexport(data.map(e => pick(e, fields)), (err, csv) => {
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8' });
    fileSaver.saveAs(blob, `${day().format('MM-DD-YYYY')}_${filename}`);
  });
}

export function getSortQuery(sort) {
  return `{${Object.entries(sort)
    .map(([key, val]) => `${key}: ${val ? 'asc' : 'desc'}`)
    .join(',')}}`;
}

export function addClassTimeout({
  target, classIn, classOut, timeout, callback,
}) {
  debounce(() => {
    target.classList.remove(classOut);
    target.classList.add(classIn);
    setTimeout(() => {
      target.classList.add(classOut);
      target.classList.remove(classIn);
      callback();
    }, timeout);
  }, timeout);
}

export function filterRole(path, user) {
  const key = path.replace(/\//g, '');
  if (user.role === 'USER') {
    return user[`${key}_role`] && user[`${key}_business_units`].length;
  }
  return true;
}

let timer = 0;
export function debounce(callback, ms) {
  clearTimeout(timer);
  timer = setTimeout(callback, ms);
}


export const arrayMoveMutate = (array, from, to) => {
  array.splice(to < 0 ? array.length + to : to, 0, array.splice(from, 1)[0]);
};

export const arrayMove = (array, from, to) => {
  array = array.slice();
  arrayMoveMutate(array, from, to);
  return array;
};

export const toFormData = (fields) => {
  const formData = new FormData();
  Object.entries(fields)
    .forEach(([key, val]) => formData.append(key, val));
  return formData;
};

export const exportShapefile = data => window.location.assign(`${process.env.GEOSERVER_URL}/wfs?${qs.stringify({
  service: 'wfs', outputFormat: 'shape-zip', typeName: `cenvi:${data.id}`, request: 'GetFeature',
})}`, '_blank');

export const downloadFile = url => window.location.assign([process.env.STATIC_URL || '', url].join('/'), '_blank');

export const getPhotoUrl = photo => `${[process.env.STATIC_URL || '', photo.image_url || photo.file_path].join('/')}`;

const singularTypes = ['news'];
export const getPostType = (type) => {
  type = type.replace(/-/g, '_');
  return singularTypes.includes(type) ? type : type.slice(0, -1);
};

export const getPostLabel = (type, cardinality = 'plural') => {
  type = type.replace(/-/g, ' ');
  const label = singularTypes.includes(type) || cardinality === 'plural' ? type : `${type}s`;
  return capitalize(label);
};
