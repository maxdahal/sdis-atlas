"""Parse two manually downloaded UNC catalog pages. No network requests."""
import re, json, html
from pathlib import Path
selected = {'inls': [151,161,201,382,385,523,541,582], 'data': [110,120,130,150,215,291,317,320]}
tags = {'151':['Research','Information literacy'],'161':['Digital tools'],'201':['Information science'],'382':['Information architecture'],'385':['Teamwork','Organizational change'],'523':['Databases','SQL'],'541':['Data visualization'],'582':['Systems analysis'],'110':['Data science'],'120':['AI ethics'],'130':['Data literacy'],'150':['Communication','Storytelling'],'215':['Python','Computational tools'],'291':['Teaching'],'317':['Artificial intelligence'],'320':['Human-centered AI','AI ethics']}
def clean(s):
    return re.sub(r'\s+', ' ', html.unescape(re.sub('<[^>]+>', '', s))).strip()
result=[]
for dept, nums in selected.items():
    raw=Path('/tmp/atlas-'+dept+'.html').read_text()
    for block in raw.split('<div class="courseblock">')[1:]:
        def field(name):
            m=re.search(r'<span class="text detail-'+name+r'[^\"]*">(.*?)</span>',block,re.S)
            return clean(m.group(1)) if m else ''
        code=field('code').rstrip('.')
        num=int(re.search(r'\d+',code).group())
        if num not in nums: continue
        req=re.search(r'<span class="text detail-requisites[^\"]*">(.*?)</span>\s*(.*?)</span>',block,re.S)
        result.append({'id':code.lower().replace(' ','-'),'code':code,'title':field('title').rstrip('.'),'description':'\n\n'.join(clean(x) for x in re.findall(r'<p class="courseblockextra">(.*?)</p>',block,re.S)), 'department':dept.upper(),'credits':int(re.search(r'\d+',field('hours')).group()),'level':num//100*100,'prerequisites':clean(req.group(2)) if req else None,'catalogYear':'2026–2027','sourceUrl':'https://catalog.unc.edu/courses/'+dept+'/','skills':tags[str(num)]})
assert len(result)==16, len(result)
Path('src/data/courses.json').write_text(json.dumps(result,indent=2)+'\n')
print('\n'.join(c['code']+' | '+str(c['prerequisites']) for c in result))
