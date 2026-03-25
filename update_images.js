import fs from 'fs';

try {
  const mdContent = fs.readFileSync('cac dien gia .md', 'utf8');

  const img1Match = mdContent.match(/\[image1\]:\s*<([^>]+)>/);
  const img2Match = mdContent.match(/\[image2\]:\s*<([^>]+)>/);
  const img3Match = mdContent.match(/\[image3\]:\s*<([^>]+)>/);

  if (img1Match && img2Match && img3Match) {
    const img1 = img1Match[1];
    const img2 = img2Match[1];
    const img3 = img3Match[1];

    let speakers = fs.readFileSync('client/src/components/SpeakersSection.tsx', 'utf8');
    speakers = speakers.replace(/"https:\/\/ibb\.co\/wZNVCVdF"/g, '`' + img1 + '`');
    speakers = speakers.replace(/"https:\/\/ibb\.co\/DmgPpDg"/g, '`' + img2 + '`');
    speakers = speakers.replace(/"https:\/\/ibb\.co\/nMmv7kQd"/g, '`' + img3 + '`');
    fs.writeFileSync('client/src/components/SpeakersSection.tsx', speakers);

    let schedule = fs.readFileSync('client/src/components/ScheduleSection.tsx', 'utf8');
    schedule = schedule.replace(/"https:\/\/ibb\.co\/wZNVCVdF"/g, '`' + img1 + '`');
    schedule = schedule.replace(/"https:\/\/ibb\.co\/DmgPpDg"/g, '`' + img2 + '`');
    schedule = schedule.replace(/"https:\/\/ibb\.co\/nMmv7kQd"/g, '`' + img3 + '`');
    fs.writeFileSync('client/src/components/ScheduleSection.tsx', schedule);

    console.log("Successfully injected base64 images into TSX components.");
  } else {
    console.log("Could not find all 3 images in the markdown file.");
  }
} catch (e) {
  console.error("Error:", e);
}
