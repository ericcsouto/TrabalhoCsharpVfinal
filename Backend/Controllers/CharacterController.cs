using Microsoft.AspNetCore.Mvc;

namespace rpgAPi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CharacterController : ControllerBase
    {
        private readonly DataContext _context;
        public CharacterController(DataContext context)
        {
            _context = context;
        }

        //list character by id
        [HttpGet("ListCharacterByUserId")]
        public async Task<ActionResult<List<Character>>> Get(int userId)
        {
            var characters = await _context.Characters
            .Where(c => c.UserId == userId)
            .Include(c => c.Weapon)
            .Include(c => c.Skills)
            .ToListAsync();

            return characters;
        }

        //list all characters
        [HttpGet("ListAllCharacters")]
        public async Task<ActionResult<List<Character>>> GetAllCharacters()
        {
            var characters = await _context.Characters
            .Where(c => c.UserId != null)
            .Include(c => c.Weapon)
            .Include(c => c.Skills)
            .ToListAsync();

            return Ok(characters);
        }

        //Add character
        [HttpPost("AddCharacter")]
        public async Task<ActionResult<List<Character>>> Create(CreateCharacterDto request)
        {

            var user = await _context.Users.FindAsync(request.UserId);
            if (user == null)
                return NotFound();

            var newCharacter = new Character
            {
                Name = request.Name,
                RpgClass = request.RpgClass,
                User = user
            };
            
            _context.Characters.Add(newCharacter);
            await _context.SaveChangesAsync();

            return await Get(newCharacter.UserId);
        }

        [HttpPost("AddWeapon")]
        public async Task<ActionResult<Character>> AddWeapon(AddWeaponDTO request)
        {

            var character = await _context.Characters.FindAsync(request.CharacterId);
            if (character == null)
                return NotFound();

            var newWeapon = new Weapon
            {
                Name = request.Name,
                Damage = request.Damage,
                Character = character
            };
            
            _context.Weapons.Add(newWeapon);
            await _context.SaveChangesAsync();

            return character;
        }

        [HttpPost("AddSkill")]
        public async Task<ActionResult<Character>> AddCharacterSkill(AddCharacterSkillDto request)
        {

            var character = await _context.Characters
                .Where(c => c.Id == request.CharacterId)
                .Include(c => c.Skills)
                .FirstOrDefaultAsync();
            
            
            if (character == null)
                return NotFound();

            var skill = await _context.Skills.FindAsync(request.SkillId);
            if (skill == null)
                return NotFound();

            character.Skills.Add(skill);
            await _context.SaveChangesAsync();

            return character;
        }

        //delete character
        [HttpDelete("DeleteCharacter")]
        public async Task<ActionResult<Character>> DeleteCharacter(int id)
        {
            var character = await _context.Characters
            .Include(c => c.Weapon)
            .Include(c => c.Skills)
            .FirstOrDefaultAsync(c => c.Id == id);

            _context.Characters.Remove(character);
            await _context.SaveChangesAsync();

            return character;
        }



    }

}


    //     private readonly DataContext _context;
    //     public CharacterController(DataContext context)
    //     {
    //         _context = context;
    //     }

    //     [HttpGet("GetAll")]
    //     public async Task<IActionResult> Get()
    //     {
    //         return Ok(await _context.Characters.ToListAsync());
    //     }

    //     [HttpGet("{id}")]
    //     public async Task<IActionResult> GetSingle(int id)
    //     {
    //         return Ok(await _context.Characters.FirstOrDefaultAsync(c => c.Id == id));
    //     }

    //     [HttpPost]
    //     public async Task<IActionResult> AddCharacter(Character newCharacter)
    //     {
    //         _context.Characters.Add(newCharacter);
    //         await _context.SaveChangesAsync();
    //         return Ok(newCharacter.Id);
    //     }
    // }
