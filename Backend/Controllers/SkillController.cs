using Microsoft.AspNetCore.Mvc;

namespace rpgAPi.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class SkillController : ControllerBase
    {
        private readonly DataContext _context;
        public SkillController(DataContext context)
        {
            _context = context;
        }

        [HttpPost("AddSkill")]
        public async Task<ActionResult<List<Skill>>> AddSkill(AddSkillDto request)
        {

          Skill skill = new Skill
          {
              Name = request.Name,
              Damage = request.Damage
          };

          _context.Skills.Add(skill);
          await _context.SaveChangesAsync();
          return Ok(skill);
        }

        //update skill information
        [HttpPut("UpdateSkill")]
        public async Task<ActionResult<List<Skill>>> UpdateSkill(AddSkillDto request)
        {
            var skill = await _context.Skills.FindAsync(request.Id);
            if (skill == null)
                return NotFound();

            skill.Name = request.Name;
            skill.Damage = request.Damage;
            await _context.SaveChangesAsync();
            return Ok(skill);
        }
        
        //remove skill
        [HttpDelete("RemoveSkill")]
        public async Task<ActionResult<List<Skill>>> RemoveSkill(int id)
        {
            var skill = await _context.Skills.FindAsync(id);
            if (skill == null)
                return NotFound();

            _context.Skills.Remove(skill);
            await _context.SaveChangesAsync();
            return Ok(skill);
        }

        //list all skills
        [HttpGet("ListAllSkills")]
        public async Task<ActionResult<List<Skill>>> GetAllSkills()
        {
            var skills = await _context.Skills.ToListAsync();
            return Ok(skills);
        }

        //get skill by id
        [HttpGet("ListSkillById")]
        public async Task<ActionResult<Skill>> GetSkillById(int id)
        {
            var skill = await _context.Skills.FindAsync(id);
            if (skill == null)
                return NotFound();

            return Ok(skill);
        }
    }
}